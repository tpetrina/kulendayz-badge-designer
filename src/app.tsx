import "./app.css";
import { useEffect, useState } from "preact/hooks";
import html2canvas from "html2canvas";

import kulendayzLogo from "./kulendayz.svg";
import avatar from "./toni.png";

import { data } from "./data";
data.sort((l, r) => l.title.localeCompare(r.title));
const info = data.find((x) => x.id === 407)!;

export function App() {
  const [title, setTitle] = useState(info.title);
  const [name, setName] = useState(info.speakers[0].name);
  const [labels, setLabels] = useState(info.labels);

  const [selected, setSelected] = useState(407);

  const [rendered, setRendered] = useState(false);

  function select(id: number) {
    setSelected(id);
    const info = data.find((x) => x.id === id);
    setTitle(info?.title);
    setName(info?.speakers[0].name);
    setLabels(info?.labels);
  }

  function render() {
    setRendered(true);

    setTimeout(() => {
      html2canvas(document.querySelector("#badge")!, {
        width: 960,
        height: 720,
      }).then((canvas) => {
        document.getElementById("result")!.appendChild(canvas);
      });
    }, 0);
  }

  useEffect(() => {
    window.addEventListener("keydown", function (key) {
      if (key.key === "Escape") {
        setRendered(false);
        document.getElementById("result")!.innerHTML = "";
      }
    });
  }, []);

  return (
    <>
      <section
        style={{
          background: "white",
          padding: "0.25em 2em",
          boxShadow: "0 1px 5px #ddd",
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1>KulenDayz badge designer</h1>

        <select
          style={{ margin: "0 1em" }}
          value={selected}
          onChange={(e) => select(+e.target!.value)}
        >
          {data.map((session) => (
            <option key={session.id} value={session.id}>
              {session.title} - {session.speakers[0].name}
            </option>
          ))}
        </select>

        <section id="capture" style={{ marginLeft: "auto " }}>
          <button onClick={render}>Render!</button>
        </section>
      </section>

      <main style={{ marginTop: "1em" }}>
        <section
          id="badge"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            position: "relative",
            width: "960px",
            height: "720px",
            boxShadow: "0px 0px 10px #ddd",
          }}
        >
          <section
            style={{
              top: "50%",
              position: "absolute",
              transform: "translateY(-50%)",
              paddingLeft: "2em",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "3em",
                lineHeight: "1em",
                margin: "0.5em 0",
                maxWidth: "60%",
                width: "100%",
              }}
            >
              {title}
            </p>

            <p className="ghost-input" style={{ fontSize: "2em" }}>
              {name}
            </p>

            <section
              style={{
                margin: "0.5em 0",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {/* <p>{info.speakers[0].tagline}</p> */}
              {labels.map((label) => {
                if (!!label.image) {
                  return (
                    <img
                      src={`https://api.run.events/api/assets/external-logo?imageId=${label.image}&assetType=LabelBadgeImage`}
                      alt=""
                      width={32}
                      style={{
                        marginRight: "5px",
                      }}
                    />
                  );
                }

                return (
                  <span
                    key={label.id}
                    style={{
                      borderRadius: "20px",
                      backgroundColor: label.color,
                      padding: "4px 12px",
                      fontSize: "11px",
                      marginRight: "5px",
                      color: "white",
                    }}
                  >
                    {label.name}
                  </span>
                );
              })}
            </section>
          </section>

          <section style={{ paddingTop: "3em", paddingLeft: "2em" }}>
            {/* <img src="https://kulendayz.com/assets/logo.0e61d89c.svg" alt="" /> */}
            <img src={kulendayzLogo} />
          </section>

          <img
            style={{
              borderRadius: "100%",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "2em",
              width: "15em",
              boxShadow: "1px 1px 10px #ccc",
            }}
            src={avatar}
            // src={`https://api.run.events/api/assets/external-logo?imageId=${info.speakers[0].image}&assetType=SpeakerProfileImage`}
            alt=""
          />
        </section>

        {rendered && (
          <>
            <section
              style={{
                background: "#ccccccee",
                position: "fixed",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                height: "100vh",
                alignItems: "center",
              }}
            >
              <h2 style={{ margin: "1em 0 0 0" }}>
                Right click and save image below
              </h2>
              <p style={{ margin: "1em 0" }}>
                <small>(Escape to cancel)</small>
              </p>

              <section
                id="result"
                style={{
                  boxShadow: "1px 1px 10px #999",
                }}
              ></section>
            </section>
          </>
        )}
      </main>
    </>
  );
}
