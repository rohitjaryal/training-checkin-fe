import PageTab from "./components/PageTab";
import moment from "moment";

const Checkin = () => {
  const currentTime = moment().format("YYYY-MM-DD HH:mm");
  const currentDay = moment().format("dddd").toLocaleUpperCase();
  return (
    <div>
      <div>Checkin Day: {currentDay}</div>
      <div>Checkin Date: {currentTime.toString()}</div>
      <PageTab />
    </div>
  );
};

export default Checkin;
