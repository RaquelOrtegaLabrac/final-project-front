import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/use.users";
import { useSelector } from "react-redux";
import { RootState } from "../../../core/store/store";
import "./home.scss";
import { CardInstrument } from "../card/cardInstrument";
import { useInstruments } from "../../hooks/use.instruments";
import { useEffect } from "react";
export default function Home() {
  const { handleLogoutUser } = useUsers();
  const navigate = useNavigate();
  const { instruments, handleLoadInstruments } = useInstruments();

  useEffect(() => {
    handleLoadInstruments();
  }, [handleLoadInstruments]);

  const { token } = useSelector((state: RootState) => state.users);

  const handleUser = () => {
    if (token) {
      runLogout();
    } else {
      navigate("/login");
    }
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const runLogout = () => {
    handleLogoutUser();
  };

  const handleAddForm = () => {
    navigate("/create");
  };

  return (
    <>
      <div className="home-component">
        <header>
          <h1>
            <span className="first-h1">UNUSUAL</span>
            <span className="second-h1">INSTRUMENTS</span>
          </h1>

          <div className="home-buttons">
            {token ? (
              <>
                <button onClick={handleUser}>Log out</button>
              </>
            ) : (
              <>
                <button onClick={handleRegister}>SIGN UP</button>
                <button onClick={handleUser}>LOG IN</button>
              </>
            )}
          </div>
          <h2>
            <span className="first-h2">DISCOVER UNIQUE MUSICAL TREASURES</span>
            <span className="second-h2">ADD NEW ONES AND MODIFY THEM</span>
          </h2>
        </header>

        <main>
          {token ? (
            <>
              <div className="add-instrument-button-container">
                <button
                  className="add-instrument-button"
                  onClick={handleAddForm}
                >
                  Add instrument
                </button>
              </div>
            </>
          ) : (
            <></>
          )}

          <ul>
            {instruments.map((Item) => (
              <CardInstrument key={Item.id} item={Item}></CardInstrument>
            ))}
          </ul>
        </main>
      </div>
    </>
  );
}
