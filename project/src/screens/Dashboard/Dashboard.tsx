// src/screens/Dashboard/Dashboard.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useAuth } from "../../contexts/AuthContext";
import { LogOut, User } from "lucide-react";

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout} 
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-medium text-gray-500">Name:</span>
                <span className="col-span-2">{user?.name}</span>
              </div>
              <div className="grid grid-cols-3 border-b pb-2">
                <span className="font-medium text-gray-500">Email:</span>
                <span className="col-span-2">{user?.email}</span>
              </div>
              <div className="grid grid-cols-3">
                <span className="font-medium text-gray-500">User ID:</span>
                <span className="col-span-2">{user?.id}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Get Started</h3>
              <p className="text-gray-500 text-sm">
                This is a placeholder dashboard. Build your app's features here.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Features</h3>
              <p className="text-gray-500 text-sm">
                Explore the app's functionality and customize it to your needs.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-2">Settings</h3>
              <p className="text-gray-500 text-sm">
                Manage your account settings and preferences.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};