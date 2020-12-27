import Head from "next/head";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";
import VercelEvents from "../components/vercel";
import useSWR from "swr";

const Holocron = dynamic(() => import("@sampoder/holocron"), { ssr: false });

function Title() {
  return (
    <h1
      style={{
        color: "white",
        textAlign: "center",
        fontSize: "7em",
        fontWeight: "800",
      }}
    >
      ▲
    </h1>
  );
}

function LaunchButton() {
  return <button style={{ color: "white" }}>Play</button>;
}

function FullscreenButton() {
  return <button style={{ color: "white" }}>Fullscreen</button>;
}
const fetcher = (...args) => fetch(...args).then((res) => res.json());

function App() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR("/api/vercel", fetcher, { refreshInterval: 1000 });
  console.log(data);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return (
    <div className="App">
      <Holocron
        title={<Title />}
        backgroundColor="#8492a6"
        launch={<LaunchButton />}
        mode="left"
        fullscreen={<FullscreenButton />}
      >
        <VercelEvents data={data} />
      </Holocron>
    </div>
  );
}

function Profile() {
  const { data, error } = useSWR("/api/hello", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>hello {data.name}!</div>;
}

export default App;
