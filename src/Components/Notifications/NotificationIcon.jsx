import { Gift, Check, MessageSquare, Clock, Star } from "lucide-react";


export const NotificationIcon = ({ type, className = "w-6 h-6" }) => {
  switch (type) {
    case "request":
      return <Gift className={`${className} text-blue-500`} />;
    case "approval":
      return <Check className={`${className} text-green-500`} />;
    case "message":
      return <MessageSquare className={`${className} text-purple-500`} />;
    case "reminder":
      return <Clock className={`${className} text-orange-500`} />;
    case "achievement":
      return <Star className={`${className} text-yellow-500`} />;
    default:
      return <Gift className={`${className} text-gray-500`} />;
  }
};
