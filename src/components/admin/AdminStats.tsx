import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, UserCheck, TrendingUp, Activity, Target } from "lucide-react";

export const AdminStats = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      changeType: "positive",
      icon: Users,
      description: "Active platform users"
    },
    {
      title: "Active Jobs",
      value: "156",
      change: "+8%",
      changeType: "positive",
      icon: Briefcase,
      description: "Currently posted positions"
    },
    {
      title: "Candidates",
      value: "1,923",
      change: "+15%",
      changeType: "positive",
      icon: UserCheck,
      description: "Completed profiles"
    },
    {
      title: "Matches Made",
      value: "734",
      change: "+22%",
      changeType: "positive",
      icon: Target,
      description: "Successful connections"
    },
    {
      title: "Platform Growth",
      value: "18.5%",
      change: "+3.2%",
      changeType: "positive",
      icon: TrendingUp,
      description: "Monthly growth rate"
    },
    {
      title: "Daily Active",
      value: "1,247",
      change: "+5%",
      changeType: "positive",
      icon: Activity,
      description: "Daily active users"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-hover transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <stat.icon className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium ${
                stat.changeType === "positive" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.change}
              </span>
              <span className="text-xs text-muted-foreground">from last month</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};