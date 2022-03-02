import logo from "../logo.svg";

const Header = ({ counter }) => {
  return (
    <header>
      <img src={logo} alt="logo" />
      <h1>TO DO LIST</h1>
      <div>
        <i className="fas fa-tasks"></i>
        <span>
          {counter.done} / {counter.all}
        </span>
      </div>
    </header>
  );
};

export default Header;
