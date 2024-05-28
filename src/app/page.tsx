"use client";

import { useState, useEffect } from "react";
import SymbolList from "@/components/SymbolList";
import WatchList from "@/components/WatchList";
import ModalSymbolList from "@/components/ModalSymbolList";
import useFetchSymbols from "@/hooks/useFetchSymbols";

const Home = () => {
  const { symbols, loading, error } = useFetchSymbols();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1050);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col lg-custom:flex-row bg-primary p-5 rounded-lg m-5 gap-3 min-h-dvh relative">
      {isMobile ? (
        <>
          <button
            className="bg-text-black z-30 text-white p-2 rounded-lg fixed bottom-5 right-5 "
            onClick={toggleModal}
          >
            {isModalOpen ? "Close Symbol List" : "Open Symbol List"}
          </button>
          <ModalSymbolList
            symbols={symbols}
            isOpen={isModalOpen}
            onClose={toggleModal}
          />
        </>
      ) : (
        <div className="flex-grow">
          <SymbolList symbols={symbols} />
        </div>
      )}
      <WatchList />
    </div>
  );
};

export default Home;
