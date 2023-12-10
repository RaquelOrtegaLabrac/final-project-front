import { useNavigate, useParams } from "react-router-dom";
import { useInstruments } from "../../hooks/use.instruments";
import queryString from "query-string";
import "./instrumentDetail.scss";
import { Instrument } from "../../models/instrument";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useUsers } from "../../hooks/use.users";

const extractVideoId = (url: string) => {
  const parsed = queryString.parseUrl(url);
  return parsed.query.v || null;
};

export default function InstrumentDetail() {
  const navigate = useNavigate();
  const { handleLoadInstruments, handleDeleteInstrument } = useInstruments();
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const { token } = useUsers();
  const { instruments } = useInstruments();

  const item: Instrument | undefined = instruments.find(
    (item) => item.id === id
  );

  useEffect(() => {
    const fetchData = async () => {
      await handleLoadInstruments();
      setIsLoading(false);
    };

    fetchData();
  }, [handleLoadInstruments]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!item) {
    return <p>Instrument not found</p>;
  }

  const url = `${item.video}`;
  const videoId = extractVideoId(url);


  const handleDelete = () => {
    handleDeleteInstrument(item.id);
    navigate("/");
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "SUCCESS!!",
      text: "The instrument has been deleted",
      background:
        "linear-gradient(to right, rgba(100, 100, 100), rgba(70, 70, 70))",
      color: "white",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <>
      <div className="instrumentDetail-component">
        <div className="image-container-detail">
          <img src={item.image?.url} alt="instrument-image" />
        </div>
        <div className="title-container">
          <h1>{item.name}</h1>
          <h2>{item.shortDescription}</h2>
        </div>
        <div className="iframe-container">
          {videoId ? (
            <iframe
      
              src={`https://www.youtube.com/embed/${videoId}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <p></p>
          )}
        </div>
        <div className="specifications-container">
          <p className="specifications">SPECIFICATIONS</p>
          <p className="specifications-label">Inventor(s):</p>
          <p>{item.inventor}</p>
          <p className="specifications-label">Developed in:</p>
          <p>{item.developed}</p>
          <p className="specifications-label">Classification:</p>
          <p>{item.classification}</p>
          {token ? (
            <>
              <button onClick={() => navigate(`/update/${item.id}`)}>
                EDIT
              </button>
              <button onClick={handleDelete}>Delete this instrument</button>
            </>
          ) : (
            <p></p>
          )}
        </div>
      </div>
    </>
  );
}
