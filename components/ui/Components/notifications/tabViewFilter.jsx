import { userData } from "../../../../src/hooks/use/userData";
import { ContentNofitications } from "./customScreenNotification";

export const FilterNotRead = () => {
  const noleida = "no leida"
  const { CEDULA } = userData();
  return <ContentNofitications estado={noleida} cedula={CEDULA} />;
};

export const FilterRead = () => {
  const leida = "leida"
  const { CEDULA } = userData();
  return <ContentNofitications estado={leida} cedula={CEDULA} />;
};

export const NotificationAll = () => {
  const { CEDULA } = userData();
  return <ContentNofitications cedula={CEDULA} />;
};
