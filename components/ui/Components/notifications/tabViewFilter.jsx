import { useAuth } from "../../../../src/hooks/useAuth";
import { ContentNofitications } from "./customScreenNotification";

export const FilterNotRead = () => {
  const { user } = useAuth();
  const CEDULA = user.cedula;
  return <ContentNofitications estado="no leida" cedula={CEDULA} />;
};

export const FilterRead = () => {
  const { user } = useAuth();
  const CEDULA = user.cedula;
  return <ContentNofitications estado="leida" cedula={CEDULA} />;
};

export const NotificationAll = () => {
  const { user } = useAuth();
  const CEDULA = user.cedula;
  return <ContentNofitications cedula={CEDULA} />;
};
