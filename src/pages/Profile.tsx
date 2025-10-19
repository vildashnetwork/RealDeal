// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { User as UserIcon, LogOut, Package, Edit2, Save } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { useAuth } from '@/contexts/AuthContext';
// import { updateUser, getOrders } from '@/lib/localStorage';
// import { toast } from 'sonner';

// const Profile = () => {
//   const navigate = useNavigate();
//   const { user, logout, isAuthenticated } = useAuth();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     email: user?.email || '',
//     phone: user?.phone || '',
//     street: user?.address?.street || '',
//     city: user?.address?.city || '',
//     state: user?.address?.state || '',
//     zip: user?.address?.zip || ''
//   });

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/auth');
//     }
//   }, [isAuthenticated, navigate]);

//   const orders = user ? getOrders(user.id) : [];

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     if (!user) return;

//     const updatedUser = {
//       ...user,
//       name: formData.name,
//       phone: formData.phone,
//       address: {
//         street: formData.street,
//         city: formData.city,
//         state: formData.state,
//         zip: formData.zip
//       }
//     };

//     updateUser(updatedUser);
//     setIsEditing(false);
//     toast.success('Profile updated successfully');
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//   };

//   if (!user) return null;

//   return (
//     <div className="min-h-screen py-12">
//       <div className="container mx-auto px-4 max-w-4xl">
//         <div className="flex items-center justify-between mb-8">
//           <h1 className="text-4xl font-bold">My Profile</h1>
//           <Button variant="destructive" onClick={handleLogout}>
//             <LogOut className="h-4 w-4 mr-2" />
//             Logout
//           </Button>
//         </div>

//         <div className="grid lg:grid-cols-3 gap-6">
//           {/* Profile Information */}
//           <div className="lg:col-span-2">
//             <Card>
//               <CardHeader>
//                 <div className="flex items-center justify-between">
//                   <CardTitle className="flex items-center gap-2">
//                     <UserIcon className="h-5 w-5" />
//                     Personal Information
//                   </CardTitle>
//                   {!isEditing ? (
//                     <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
//                       <Edit2 className="h-4 w-4 mr-2" />
//                       Edit
//                     </Button>
//                   ) : (
//                     <Button size="sm" onClick={handleSave} className="bg-accent hover:bg-accent/90">
//                       <Save className="h-4 w-4 mr-2" />
//                       Save
//                     </Button>
//                   )}
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <Label htmlFor="name">Full Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     disabled
//                     className="bg-muted"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="phone">Phone</Label>
//                   <Input
//                     id="phone"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="street">Street Address</Label>
//                   <Input
//                     id="street"
//                     name="street"
//                     value={formData.street}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                   />
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   <div className="col-span-2">
//                     <Label htmlFor="city">City</Label>
//                     <Input
//                       id="city"
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="state">State</Label>
//                     <Input
//                       id="state"
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                       disabled={!isEditing}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label htmlFor="zip">ZIP Code</Label>
//                   <Input
//                     id="zip"
//                     name="zip"
//                     value={formData.zip}
//                     onChange={handleChange}
//                     disabled={!isEditing}
//                   />
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Order History */}
//           <div className="lg:col-span-1">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Package className="h-5 w-5" />
//                   Order History
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 {orders.length === 0 ? (
//                   <p className="text-muted-foreground text-sm">No orders yet</p>
//                 ) : (
//                   <div className="space-y-3">
//                     {orders.map((order) => (
//                       <div
//                         key={order.id}
//                         className="p-3 border border-border rounded-lg hover:shadow-soft transition-shadow"
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <p className="font-semibold text-sm">#{order.id.slice(-8).toUpperCase()}</p>
//                             <p className="text-xs text-muted-foreground">
//                               {new Date(order.createdAt).toLocaleDateString()}
//                             </p>
//                           </div>
//                           <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
//                             {order.status}
//                           </span>
//                         </div>
//                         <p className="text-sm font-semibold text-primary">
//                           ${order.total.toFixed(2)}
//                         </p>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;












import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User as UserIcon,
  LogOut,
  Package,
  Edit2,
  Save,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Cookies from "js-cookie";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const token = Cookies.get("token");

  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    country: "",
    address: "",
    profile: ""
  });

  useEffect(() => {
    if (!token) {
      navigate("/auth");
      return;
    }
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://wicikibackend.onrender.com/decode/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
        setFormData({
          name: res.data.user.name || "",
          email: res.data.user.email || "",
          number: res.data.user.number || "",
          country: res.data.user.country || "",
          address: res.data.user.address || "",
          profile: res.data.user.profile || "",
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Session expired. Please login again.");
        Cookies.remove("token");
        navigate("/auth");
      }
    };
    fetchUser();
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    toast.loading("Uploading image...");
    const form = new FormData();
    form.append("file", file);
    form.append("upload_preset", "images-zozac");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dbq5gkepx/image/upload",
        form
      );
      const imageUrl = uploadRes.data.secure_url;
      setFormData((prev) => ({ ...prev, profile: imageUrl }));
      toast.success("Profile image uploaded!");
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
      toast.error("Image upload failed");
    } finally {
      toast.dismiss();
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(
        "https://wicikibackend.onrender.com/normal/profile/update",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Could not update profile");
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    toast.success("Logged out");
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <Button size="sm" onClick={handleSave} className="bg-accent hover:bg-accent/90">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <img
                    src={formData.profile || "/default-avatar.png"}
                    alt="Profile"
                    className="h-20 w-20 rounded-full object-cover border"
                  />
                  {isEditing && (
                    <div>
                      <Label htmlFor="profile">Change Picture</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Input type="file" accept="image/*" onChange={handleImageUpload} />
                        <Upload className="h-4 w-4 text-gray-500" />
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={formData.email} disabled className="bg-muted" />
                </div>

                <div>
                  <Label htmlFor="number">Phone</Label>
                  <Input
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order History Placeholder */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
