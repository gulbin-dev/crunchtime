import useInternetConnection from "../../hooks/useInternetConnection";
import FailedDataDialog from "../UI/Error/FailedDataDialog";
export default async function UserConnectionWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const isUserOnline = useInternetConnection();
  return isUserOnline ? (
    <FailedDataDialog
      error={{
        type: "NetworkError",
        status: 500,
        message: "Failed to fetch data, please try again",
      }}
    />
  ) : (
    <>{children}</>
  );
}
