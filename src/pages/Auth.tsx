// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Fish } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { useAuth } from '@/contexts/AuthContext';
// import { toast } from 'sonner';

// const Auth = () => {
//   const navigate = useNavigate();
//   const { login, register, isAuthenticated } = useAuth();

//   const [loginData, setLoginData] = useState({ email: '', password: '' });
//   const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

//   useEffect(() => {
//     if (isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (login(loginData.email, loginData.password)) {
//       navigate('/');
//     }
//   };

//   const handleSignup = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (signupData.password !== signupData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }

//     if (signupData.password.length < 6) {
//       toast.error('Password must be at least 6 characters');
//       return;
//     }

//     if (register(signupData.email, signupData.password, signupData.name)) {
//       navigate('/');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center py-12 px-4">
//       <Card className="w-full max-w-md shadow-large">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="flex items-center gap-2 text-primary">
//               <Fish className="h-8 w-8" />
//               <span className="font-bold text-2xl">ReelDeal</span>
//             </div>
//           </div>
//           <CardTitle className="text-2xl">Welcome</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <Tabs defaultValue="login" className="w-full">
//             <TabsList className="grid w-full grid-cols-2 mb-6">
//               <TabsTrigger value="login">Login</TabsTrigger>
//               <TabsTrigger value="signup">Sign Up</TabsTrigger>
//             </TabsList>

//             <TabsContent value="login">
//               <form onSubmit={handleLogin} className="space-y-4">
//                 <div>
//                   <Label htmlFor="login-email">Email</Label>
//                   <Input
//                     id="login-email"
//                     type="email"
//                     value={loginData.email}
//                     onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="login-password">Password</Label>
//                   <Input
//                     id="login-password"
//                     type="password"
//                     value={loginData.password}
//                     onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full bg-primary hover:bg-primary-light">
//                   Login
//                 </Button>
//               </form>
//             </TabsContent>

//             <TabsContent value="signup">
//               <form onSubmit={handleSignup} className="space-y-4">
//                 <div>
//                   <Label htmlFor="signup-name">Full Name</Label>
//                   <Input
//                     id="signup-name"
//                     value={signupData.name}
//                     onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="signup-email">Email</Label>
//                   <Input
//                     id="signup-email"
//                     type="email"
//                     value={signupData.email}
//                     onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="signup-password">Password</Label>
//                   <Input
//                     id="signup-password"
//                     type="password"
//                     value={signupData.password}
//                     onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="signup-confirm">Confirm Password</Label>
//                   <Input
//                     id="signup-confirm"
//                     type="password"
//                     value={signupData.confirmPassword}
//                     onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
//                     required
//                   />
//                 </div>
//                 <Button type="submit" className="w-full bg-cta hover:bg-cta/90 text-cta-foreground">
//                   Create Account
//                 </Button>
//               </form>
//             </TabsContent>
//           </Tabs>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default Auth;




















import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Fish } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import axios from 'axios';
import Cookies from 'js-cookie';

const Auth = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Check for existing token
  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  // 🔹 Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post('https://realdealbackend.onrender.com/normal/login', {
        email: loginData.email,
        password: loginData.password,
      });

      if (res.status === 200) {
        toast.success('Login successful!');
        Cookies.set('token', res.data.token, { expires: 15 }); // store JWT
        navigate('/');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Signup
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (signupData.password !== signupData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (signupData.password.length < 10) {
      toast.error('Password must be at least 10 characters');
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post('https://realdealbackend.onrender.com/normal/register', {
        email: signupData.email,
        password: signupData.password,
      });

      if (res.status === 201) {
        toast.success('Account created successfully!');
        Cookies.set('token', res.data.token, { expires: 15 });
        navigate('/');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-muted/10">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-2 text-primary">
              <Fish className="h-8 w-8" />
              <span className="font-bold text-2xl">ReelDeal</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Welcome</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* LOGIN */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData({ ...loginData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </form>
            </TabsContent>

            {/* SIGNUP */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    value={signupData.name}
                    onChange={(e) =>
                      setSignupData({ ...signupData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) =>
                      setSignupData({ ...signupData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({ ...signupData, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="signup-confirm">Confirm Password</Label>
                  <Input
                    id="signup-confirm"
                    type="password"
                    value={signupData.confirmPassword}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-cta hover:bg-cta/90 text-cta-foreground"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
