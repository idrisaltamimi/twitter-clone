import { type NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import InfiniteTweetList from "~/components/InfiniteTweetList";
import NewTweetForm from "~/components/NewTweetForm";
import { api } from "~/utils/api";

const TABS = ["For you", "Following"];

const Home: NextPage = () => {
  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("For you");
  const session = useSession();

  return (
    <>
      <header className="sticky top-0 z-10 border-b bg-white pt-2">
        <h1 className="mb-2 px-4 text-lg font-bold">
          {session.status === "authenticated" ? "Home" : "Explore"}
        </h1>
        {session.status === "authenticated" && (
          <div className="flex">
            {TABS.map((tab) => {
              return (
                <button
                  key={tab}
                  className={`basis-full py-1 hover:bg-gray-200 focus-visible:bg-gray-200`}
                  onClick={() => setSelectedTab(tab)}
                >
                  <span
                    className={`relative py-2 ${
                      tab === selectedTab
                        ? "after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:rounded-full after:bg-blue-500"
                        : ""
                    }`}
                  >
                    {tab}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </header>
      <NewTweetForm />
      {selectedTab === "For you" ? <RecentTweets /> : <FollowingTweets />}
    </>
  );
};

function RecentTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((pages) => pages.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}

function FollowingTweets() {
  const tweets = api.tweet.infiniteFeed.useInfiniteQuery(
    { onlyFollowing: true },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );

  return (
    <InfiniteTweetList
      tweets={tweets.data?.pages.flatMap((pages) => pages.tweets)}
      isError={tweets.isError}
      isLoading={tweets.isLoading}
      hasMore={tweets.hasNextPage}
      fetchNewTweets={tweets.fetchNextPage}
    />
  );
}

export default Home;
