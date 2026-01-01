import type {HighlightSpan} from "./HighlightedText";
type HighLightsProps = {
  highlights: Record<string, HighlightSpan[]>;
}
const HighLights = ({ highlights }:HighLightsProps) => {
  console.log(highlights);
  return (
      <aside className="snippets">
        <h2>Selected Items</h2>
        <div className="snippet-list">
          { Object.entries(highlights).map(([key, value]) => {
            return (
              <div key={key}>
                <h3>{key} ({value.length})</h3>
                <ul>
                  {value.map(s => (
                    <li key={s.id} className="snippet">
                      <div className="snippet-text">{s.text}</div>
                    </li>
                  ))}
                </ul>
              </div>
            )
        })}
        </div>
      </aside>
  );
}

export default HighLights;