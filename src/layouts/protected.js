import ProtectedHeader from "../components/layouts/protectedHeader";

const Protected = ({ children }) => (
  <div>
    <ProtectedHeader />
    {children}
  </div>
);

export default Protected;
