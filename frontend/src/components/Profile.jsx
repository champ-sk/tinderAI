import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  // ✅ user is now the plain object — pass directly
  return user && (
    <div>
      <EditProfile user={user} />
    </div>
  );
};

export default Profile;