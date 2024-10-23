export default function ButtonSecondary(props: any) {
  return (
    <button
      type={props.type ? props.type : "button"}
      className={`inline-flex items-center border border-white/20 px-4 py-2 rounded-lg font-medium shadow-md text-sm ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
