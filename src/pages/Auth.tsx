
import React, { useState, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoadingIndicator from '@/components/LoadingIndicator';
import { toast } from '@/components/ui/use-toast';
import { User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Handle tab change animation
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleSubmit = async (e: FormEvent, type: 'login' | 'signup') => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (type === 'login') {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      toast({
        title: "Authentication Error",
        description: error.message || "Failed to authenticate. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-background via-blue-50/20 to-primary/10 dark:from-background dark:via-blue-950/20 dark:to-primary/5">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
      </div>
      
      <div className="container relative flex flex-col items-center justify-center space-y-6 px-4 md:px-6">
        <div className="flex items-center justify-center space-x-2 animate-fade-in">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg">
            <User className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">ProfileMapper</h1>
        </div>
        
        <p className="max-w-md text-center text-muted-foreground animate-fade-in opacity-0" style={{animationDelay: '200ms', animationFillMode: 'forwards'}}>
          Explore profiles and their locations with our interactive map interface
        </p>
        
        <Card className="w-full max-w-md overflow-hidden bg-card/95 backdrop-blur shadow-xl animate-fade-in opacity-0" style={{animationDelay: '400ms', animationFillMode: 'forwards'}}>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl font-bold text-center">
              {activeTab === 'login' ? 'Welcome back' : 'Create an account'}
            </CardTitle>
            <CardDescription className="text-center">
              {activeTab === 'login' 
                ? 'Enter your credentials to access your account' 
                : 'Fill in your details to get started'}
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="login" className="w-full" onValueChange={handleTabChange}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <LogIn className="mr-2 h-4 w-4" /> Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-4 pt-0">
              <form onSubmit={(e) => handleSubmit(e, 'login')} className="space-y-4">
                <CardContent className="space-y-4 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center text-sm font-medium">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" /> 
                      Email
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="flex items-center text-sm font-medium">
                        <Lock className="mr-2 h-4 w-4 text-muted-foreground" /> 
                        Password
                      </Label>
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background/50"
                      required
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-all" disabled={isLoading}>
                    {isLoading ? <LoadingIndicator size="sm" /> : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" /> Login
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4 pt-0">
              <form onSubmit={(e) => handleSubmit(e, 'signup')} className="space-y-4">
                <CardContent className="space-y-4 pt-0">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="flex items-center text-sm font-medium">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" /> 
                      Email
                    </Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background/50"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="flex items-center text-sm font-medium">
                      <Lock className="mr-2 h-4 w-4 text-muted-foreground" /> 
                      Password
                    </Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-background/50"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Password must be at least 6 characters long
                    </p>
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 transition-all" disabled={isLoading}>
                    {isLoading ? <LoadingIndicator size="sm" /> : (
                      <>
                        <UserPlus className="mr-2 h-4 w-4" /> Create Account
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
        
        <p className="text-center text-sm text-muted-foreground animate-fade-in opacity-0" style={{animationDelay: '600ms', animationFillMode: 'forwards'}}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Auth;
