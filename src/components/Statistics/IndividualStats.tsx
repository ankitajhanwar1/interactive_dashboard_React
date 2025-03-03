import React, { useContext } from "react";
import "./IndividualStats.css";
import { SummaryDataContext } from "../../lib/store/SummaryStoreContext";

const IndividualStats: React.FC = () => {
  const { summaryData } = useContext(SummaryDataContext);
  const currency = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
  });

  
  return (
    <div className="featuredContainer">
      {summaryData &&
        Object.entries(summaryData).map(([key, value]) => (
          <div className="featuredItem" key={key}>
            <span className="featuredTitle">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
            <div className="featuredMoneyContainer">
              <span className="featuredMoney">{currency.format(value.toFixed(2))}</span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default IndividualStats;
