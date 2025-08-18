import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface OnboardingAnswers {
  name: string;
  email: string;
  experience: string;
  skills: string[];
  interests: string[];
  goals: string;
  availability: string;
  pitch_text: string;
}

interface GeneratedProfile {
  titles: string[];
  skills: {
    pro: string[];
    growing: string[];
  };
  goals: {
    roles: string[];
    industries: string[];
  };
  learningGaps: string[];
  summary: string;
  suggestedProjects: string[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { answers }: { answers: OnboardingAnswers } = await req.json()

    // Get OpenAI API key from environment
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Create a detailed prompt for profile generation
    const prompt = `
Based on the following candidate information, generate a structured career profile. Analyze their experience, skills, interests, and goals to create comprehensive recommendations.

Candidate Information:
- Name: ${answers.name}
- Experience: ${answers.experience}
- Skills: ${answers.skills.join(', ')}
- Interests: ${answers.interests.join(', ')}
- Career Goals: ${answers.goals}
- Availability: ${answers.availability}
- Pitch: ${answers.pitch_text}

Please analyze this information and return a JSON object with the following structure:
{
  "titles": ["Professional titles that match their experience and goals (3-5 titles)"],
  "skills": {
    "pro": ["Skills they are strong in based on experience (5-8 skills)"],
    "growing": ["Skills they should develop based on goals (4-6 skills)"]
  },
  "goals": {
    "roles": ["Specific job roles they should target (4-6 roles)"],
    "industries": ["Industries that align with their interests (3-5 industries)"]
  },
  "learningGaps": ["Key areas they should focus on developing (3-5 gaps)"],
  "summary": "A compelling 2-3 sentence professional summary highlighting their unique value proposition",
  "suggestedProjects": ["Project ideas that would strengthen their profile (4-6 projects)"]
}

Guidelines:
- Normalize similar skills (e.g., "JavaScript", "JS", "Javascript" → "JavaScript")
- Infer related skills and roles based on their experience
- Be specific and actionable in recommendations
- Consider current market trends in their field
- Match suggestions to their stated goals and timeline
- Return only valid JSON, no additional text
`

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          {
            role: 'system',
            content: 'You are an expert career counselor and data analyst. Generate accurate, actionable career profiles based on candidate information. Always return valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const generatedContent = data.choices[0].message.content

    // Parse the JSON response
    let generatedProfile: GeneratedProfile
    try {
      generatedProfile = JSON.parse(generatedContent)
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', generatedContent)
      throw new Error('Invalid response format from AI service')
    }

    // Validate the response structure
    if (!generatedProfile.titles || !generatedProfile.skills || !generatedProfile.goals) {
      throw new Error('Incomplete profile data generated')
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Store the generated profile in the database
    const { error: updateError } = await supabase
      .from('candidates')
      .update({
        generated_profile: generatedProfile,
        profile_generated_at: new Date().toISOString()
      })
      .eq('email', answers.email)

    if (updateError) {
      console.error('Failed to store profile:', updateError)
      // Don't throw here - we can still return the generated profile
    }

    return new Response(
      JSON.stringify({ success: true, profile: generatedProfile }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error generating profile:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to generate profile'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})