import { Models } from "appwrite";

import { Loader, PostCard, UserCard } from "@/components/shared/index.ts";
import { useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries.ts";

export default function Home() {
  const {
    data: posts,
    isLoading: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);

  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Error Loading Posts</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Error Loading Users</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      {/* Home Feed Section - list of posts */}
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {isPostLoading && !posts ? (
            <Loader />
          ) : (
            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts?.documents.map((post: Models.Document) => (
                <li key={post.$id} className="flex justify-center w-full">
                  {/* display component for posts */}
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* Creators section - list of top creators */}
      <div className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                {/* display component for users */}
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
