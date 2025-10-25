"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/auth-store";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  fallback,
}: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user, checkAuth } = useAuthStore();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);

  // Check auth on mount if not already authenticated
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !hasCheckedAuth) {
      checkAuth().then(() => {
        setHasCheckedAuth(true);
      });
    } else if (isAuthenticated || isLoading) {
      setHasCheckedAuth(true);
    }
  }, [isAuthenticated, isLoading, hasCheckedAuth, checkAuth]);

  // Redirect if not authenticated after checking
  useEffect(() => {
    if (hasCheckedAuth && !isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, hasCheckedAuth, router]);

  // Show loading while checking auth
  if (isLoading || !hasCheckedAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Show fallback if not authenticated
  if (!isAuthenticated) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-center">Unauthorized. Redirecting...</p>
        </div>
      )
    );
  }

  return <>{children}</>;
}
