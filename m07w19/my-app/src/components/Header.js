function Header(props) {
  return (
    <header>
      <h1>
        {props.title} {props.emoji}
      </h1>
    </header>
  );
}

export default Header;
