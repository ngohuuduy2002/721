import StoreList from "@/components/store/StoreList";

const StorePage = () => {
  return (
    <div className="space-y-10">
      <h1 className="font-bold text-3xl text-[#3E6DD2]">List Stores</h1>
      <StoreList />
    </div>
  );
};

export default StorePage;
