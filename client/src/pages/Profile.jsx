import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import assets from "../assets/assets";
import { AuthContext } from "../../context/Context";

const Profile = () => {
  const { authUser, updateProfile } = useContext(AuthContext);

  const [selectedImg, setSelectedImg] = useState(null);
  const [name, setName] = useState(authUser.full_name);
  const [bio, setBio] = useState(authUser.bio);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = JSON.stringify({
      full_name: name, bio
    });

    const formdata = new FormData();
    formdata.append("data", payload,);
    formdata.append("file", selectedImg);

    await updateProfile(formdata);
  };


  return (
    <>
     <div className="flex justify-center items-center absolute top-35 left-[40%]">
        <Link className="bg-purple-500 px-3 py-3" to="/">Got to Home Page</Link>
     </div>

      <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center ">
        <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border0-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse rounded-lg ">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 p-10 flex-1"
          >
            <h3 className="text-lg">Profile details</h3>
            <label
              htmlFor="avatar"
              className="flex items-center gap-3 cursor-pointer"
            >
              <input
                onChange={(e) => setSelectedImg(e.target.files[0])}
                type="file"
                id="avatar"
                accept=".png, .jpg, .jpeg"
                hidden
              />
              <img
                src={
                  selectedImg
                    ? URL.createObjectURL(selectedImg)
                    : authUser.picture || assets.avatar_icon
                }
                alt="Profile Image"
                className={`w-12 h-12 rounded-full`}
              />
              Upload profile image
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              defaultValue={authUser.full_name}
              type="text"
              required
              placeholder="Your name"
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 "
            />
            <textarea
              onChange={(e) => setBio(e.target.value)}
              value={bio}
              defaultValue={authUser.bio}
              placeholder="Write profile bio"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
              rows={4}
            ></textarea>

            <button
              type="submit"
              className="bg-linear-to-r fro-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer "
            >
              Save
            </button>
          </form>

          <img
            src={authUser.picture || assets.logo_icon}
            className="max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default Profile;
<h1>Profile Page</h1>;
