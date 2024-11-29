import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ROLES } from "@/constants/authentication";
import { IUser } from "@/models/authentication";

type WithAuthProps = {
  user: IUser;
};

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P & WithAuthProps>,
  roles: ROLES | ROLES[] // Accept either a single role or a list of roles
) => {
  const ProtectedComponent: React.FC<P> = (props) => {
    const [user, setUser] = useState<IUser | null>(null);
    const router = useRouter();

    useEffect(() => {
      const userCookie = Cookies.get("userInfo");

      if (userCookie) {
        try {
          const parsedUser: IUser = JSON.parse(userCookie);

          // Normalize roles to always be an array
          const roleList = Array.isArray(roles) ? roles : [roles];

          // Check if the user's role matches any of the roles in the list
          const hasAccess = roleList.some(
            (role) =>
              (role === ROLES.ADMIN && parsedUser.is_admin) ||
              (role === ROLES.TRAINER && parsedUser.is_trainer) ||
              (role === ROLES.STUDENT && parsedUser.is_student)
          );

          if (hasAccess) {
            setUser(parsedUser); // User has access
          } else {
            return;
          }
        } catch (error) {
          console.error("Failed to parse user cookie:", error);
          router.push("/"); // Redirect on error
        }
      } else {
        router.push("/"); // Redirect if no cookie
      }
    }, [router]);

    if (!user) {
      return;
    }

    return <WrappedComponent {...props} user={user} />;
  };

  return ProtectedComponent;
};

export default withAuth;
