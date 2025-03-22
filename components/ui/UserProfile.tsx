import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { User } from "firebase/auth";
import Link from "next/link";
import { Calendar, User as UserIcon } from "lucide-react"; 
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Button } from "./button";
import Image from "next/image";

interface UserProfileProps {
  user: User | null;
}

const UserProfile = ({ user }: UserProfileProps) => {

  if (!user) return null;

  const { email, displayName, photoURL, metadata } = user;
  const { creationTime, lastSignInTime } = metadata;


  return (
    <Card>
      <CardHeader>
        <h3 className="text-xl font-semibold text-foreground">User Profile</h3>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-300">
            {photoURL ? (
              <Image
                src={photoURL}
                alt="User Avatar"
                width={64}
                height={64}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white text-xl">
                {displayName?.charAt(0)}
              </div>
            )}
          </div>
          <div>
            {displayName && <h3 className="text-2xl font-bold">{displayName}</h3>}
            <h4 className="text-lg font-semibold mb-2">{email}</h4>
            <div className="flex space-x-4 text-sm text-gray-500">
              <p className="flex items-center space-x-2">
                <Calendar size={16} /> 
                <span>Member since {new Date(creationTime!).getFullYear()}</span>
              </p>
              <p className="flex items-center space-x-2">
                <UserIcon size={16} />
                <span>Last signed in {new Date(lastSignInTime!).toLocaleString()}</span>
              </p>
            </div>

            {/* User Bio */}
            <div className="mt-4 text-sm text-gray-600">
              <p><strong>Bio:</strong> I&apos;m a Fullstack Software Engineer specialising in JavaScript</p>
            </div>

            {/* User Roles */}
            <div className="mt-2 text-sm text-gray-600">
              <p><strong>Role:</strong> <span className="text-gray-700 font-semibold">Admin</span></p>
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4 mt-2">
              <Link href="#"  >
                <FaGithub size={24} className="text-gray-600 hover:text-gray-400" />
              </Link>
              <Link href="#" >
                <FaLinkedin size={24} className="text-gray-600 hover:text-gray-400" />
              </Link>
              <Link href="#">
                <FaTwitter size={24} className="text-gray-600 hover:text-gray-400" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-32 text-white" variant="default">
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
}

export default UserProfile;
