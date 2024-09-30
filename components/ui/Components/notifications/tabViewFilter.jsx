import { userData } from "../../../../src/hooks/use/userData";
import { ContentNofitications } from "./customScreenNotification";

export const FilterNotRead = () => {
  const { CEDULA } = userData();
  return <ContentNofitications estado="no leida" cedula={CEDULA} />;
};

export const FilterRead = () => {
  const { CEDULA } = userData();
  return <ContentNofitications estado="leida" cedula={CEDULA} />;
};

export const NotificationAll = () => {
  const { CEDULA } = userData();
  return <ContentNofitications cedula={CEDULA} />;
};
