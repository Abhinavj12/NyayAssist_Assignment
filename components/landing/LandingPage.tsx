"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Users, Zap, Shield, Smartphone, BarChart3, Mail } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/layout/ThemeToggle"

export function LandingPage() {
  const features = [
    {
      icon: CheckSquare,
      title: "Task Management",
      description: "Create, organize, and track your tasks with ease. Set priorities, due dates, and status updates.",
    },
    {
      icon: Mail,
      title: "Email Reminders",
      description: "Get timely email notifications for your upcoming and overdue tasks to stay on top of your schedule.",
    },
    {
      icon: Zap,
      title: "Real-time Updates",
      description: "Instant synchronization across all your devices with real-time updates.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Your data is encrypted and secure. We prioritize your privacy and security.",
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Works perfectly on desktop, tablet, and mobile devices with a mobile-first approach.",
    },
    {
      icon: BarChart3,
      title: "Analytics & Insights",
      description: "Track your productivity with detailed statistics and completion rates.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">TodoApp</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Organize Your Life with <span className="text-primary">Smart Tasks</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A modern, intuitive todo application that helps you stay organized, boost productivity, and achieve your
            goals with powerful features and beautiful design.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-3">
                Start Free Today
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Stay Organized</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you manage tasks efficiently and boost your productivity.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="text-center">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="max-w-4xl mx-auto text-center">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Organized?</CardTitle>
            <CardDescription className="text-xl">
              Join thousands of users who have transformed their productivity with TodoApp. Start your journey today.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-3">
                Create Your Account
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <CheckSquare className="h-6 w-6 text-primary" />
            <span className="font-bold">TodoApp</span>
          </div>
          <p className="text-muted-foreground text-sm">© 2024 TodoApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
