import React, { useState, useEffect } from "react";
import { useGiphyStore, useSessionStore } from "../../../../store/store";
import { GifCard } from "../../../../components/GifCard";
import { JudgedCard } from "../../../../components/JudgedCard";
import { JudgementModal } from "../../../../components/JudgementModal";
import { PlayerForm } from "../../../../components/PlayerForm";
import { ModalContainer } from "../../../../components/ModalContainer";

// TODO:
//  add card backs to table when player adds a gif
//  at end of timer or when last gif added updateSession({ displayJudgementModal: true })
//  when the judge move to pick a winner the modal with all the current gifs displays
//  judge clicks on the winning gif, modal closes and next round is initiated

export const GameTable = () => {
  const [showModal, setShowModal] = useState(true);
  const [tableContent, setTableContent] = useState();
  const [displayJudgementModal, toggleJudgementModal] = useSessionStore(
    (state) => [state.displayJudgementModal, state.toggleJudgementModal]
  );
  const [tableGifs] = useGiphyStore((state) => [state.tableGifs]);
  useEffect(() => {
    setTableContent(
      tableGifs.map((gif) => (
        <GifCard key={gif.id} gif={gif} isTableGif={true} />
      ))
    );
  }, [tableGifs]);
  const handleClick = () => {
    console.log("button functions");
    toggleJudgementModal();
  };

  const testButton =
    tableGifs.length > 1 ? (
      <button type="button" onClick={() => handleClick()}>
        Test Judgement
      </button>
    ) : null;
  return (
    <>
      {testButton}
      <JudgedCard />
      {displayJudgementModal ? (
        <ModalContainer
          show={showModal}
          onHide={() => setShowModal(false)}
          title="Picking a Winner"
          body={<JudgementModal tableGifs={tableGifs} />}
          // size={"xl"}
        />
      ) : (
        tableContent || "<GameTable/>"
      )}
    </>
  );
};
