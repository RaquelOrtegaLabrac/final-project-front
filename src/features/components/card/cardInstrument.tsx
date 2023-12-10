import { Link } from "react-router-dom";
import { Instrument } from "../../models/instrument";

import "./cardInstrument.scss";



type PropsType = {
  item: Instrument;
};

export function CardInstrument({ item }: PropsType) {
  return (
    <div className="card-instrument-container">
      <li className="item">
        <Link to={`/detail/${item.id}`}>
          <img src={item.image?.url} alt="instrument-image" />

          <span className="item-name">{item.name}</span>
          <span className="item-short-description">
            {item.shortDescription}
          </span>
        </Link>
      </li>
    </div>
  );
}
