import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export const RenderEqupment = (e) => {
  return (
    <>
      {e?.isAED ? <DoneIcon color="success" /> : <CloseIcon color="error" />}
      / <CloseIcon color="error" />
    </>
  );
}

export const getPermission = () => {
  const is_user = Number(sessionStorage.getItem("is_user") || 0);
  const permissions =
    is_user && is_user===1
      ? sessionStorage.getItem("permissions")
      : localStorage.getItem("permissions");
  return permissions;
};

export const getToken = () => {
  const is_user = Number(sessionStorage.getItem("is_user") || 0);
  // console.log({is_user})
  if (is_user && is_user===1) {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVscGhhbGtlMTIzQGdtYWlsLmNvbSIsIm5hbWUiOiJSYWh1bCBQaGFsa2UiLCJpc19hZG1pbiI6dHJ1ZSwiaXNfZWRpdCI6ZmFsc2UsInBvc2l0aW9uIjoiIiwiYWNjb3VudF9pZCI6MCwidXNlcl90eXBlIjowLCJjb250YWN0X2lkIjowLCJ1c2VySUQiOjEsImlhdCI6MTcyNTk2NTg5OSwiZXhwIjoxNzI1OTczMDk5fQ.cUL0yv00mFqNNBQYPBanmQ30G59fwImundaZ1QsGBmg"
  }
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhaHVscGhhbGtlMTIzQGdtYWlsLmNvbSIsIm5hbWUiOiJSYWh1bCBQaGFsa2UiLCJpc19hZG1pbiI6dHJ1ZSwiaXNfZWRpdCI6ZmFsc2UsInBvc2l0aW9uIjoiIiwiYWNjb3VudF9pZCI6MCwidXNlcl90eXBlIjowLCJjb250YWN0X2lkIjowLCJ1c2VySUQiOjEsImlhdCI6MTcyNTk2NTg5OSwiZXhwIjoxNzI1OTczMDk5fQ.cUL0yv00mFqNNBQYPBanmQ30G59fwImundaZ1QsGBmg"
};

export const DecryptToken = () => {
  const token = getToken();
  if (!token) {
    return "";
  }

  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const CalendarIcon = () => {
  return <img src="/assets/images/calendar.svg" alt="calendar" />;
};


const BASE = "https://ross-op.techcarrel.in";

export const BASE_API = BASE + "/api/";