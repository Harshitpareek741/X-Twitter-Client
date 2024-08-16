import { NextPage } from "next";
import TwitterLayout from "../component/TwitterLayout";
import { useState } from "react";
import { useUpdateUser } from "@/hooks/User";
import { useRouter } from "next/router";
import { Payload } from "@/gql/graphql";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../component/Header/Header";

const EditPage: NextPage = () => {
  const { mutate, isError } = useUpdateUser();
  const router = useRouter();
  const { id } = router.query;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');

  function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    
    const payload: Payload = {
      id: id as string, // Ensures `id` is a string
      firstName: firstName || "", // Provide a default empty string
      lastName: lastName || "",
      bio: bio || "",
      website: website || "",
      location: location || "",
    };
    
    mutate(payload);
    router.push(`/${id}`);
  }

  return (
    <TwitterLayout>
      <div className="overflow-hidden mx-3">
      <Header title={"Edit Profile"} subtitle={""} button={"Save"} href={`/${id}`}/>
      </div>
     
    
      <div className="flex flex-col my-9 gap-6 max-w-lg mx-3 overflow-hidden">
        
        <textarea
          className="custom-textarea p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          rows={1}
        />
        <textarea
          className="custom-textarea p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Last Name"
          value={lastName}
          rows={1}
          onChange={(e) => setLastName(e.target.value)}
        />
        <textarea
          className="custom-textarea p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <textarea
          className="custom-textarea p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Location"
          value={location}
          rows={1}
          onChange={(e) => setLocation(e.target.value)}
        />
        <textarea
          className="custom-textarea p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          placeholder="Website"
          value={website}
          rows={1}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <form onSubmit={handleUpdateUser}   >
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full py-2 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105 mx-auto w-full"
          >
            Save
          </button>
        </form>
        {isError && (
          <p className="text-red-500 mt-4 text-center">There was an error updating your profile. Please try again.</p>
        )}
      </div>
    </TwitterLayout>
  );
};

export default EditPage;
