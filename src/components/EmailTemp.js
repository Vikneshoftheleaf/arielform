import { Tailwind } from "@react-email/tailwind"

export const EmailTemplate = ({ fields, time
}) => (
  <Tailwind>
  <div>
    <div className="flex justify-start items-center p-4 bg-white">
      <h1 className="text-xl font-bold">ArielForm</h1>
      <span>{time}</span>
    </div>
    <div className="bg-emerald-100 flex items-center justify-center">
        {Object.entries(fields).map(([key, value]) => (
          <span key={key}>
            <strong>{key}:</strong> {value}
          </span>
        ))}
         </div>
    <div className="bg-emerald-600 text-emerald-950 flex justify-center items-center text-center">
      <h1>Powered by ArielForm</h1>
    </div>
  </div>
  </Tailwind>
)