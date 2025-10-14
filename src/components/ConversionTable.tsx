import { Card } from "@/components/ui/card";

const conversions = [
  { bytes: "1,000", kb: "1", mb: "0.001", mib: "0.000954" },
  { bytes: "1,000,000", kb: "1,000", mb: "1", mib: "0.954" },
  { bytes: "10,000,000", kb: "10,000", mb: "10", mib: "9.537" },
  { bytes: "100,000,000", kb: "100,000", mb: "100", mib: "95.367" },
  { bytes: "1,000,000,000", kb: "1,000,000", mb: "1,000", mib: "953.674" },
  { bytes: "1,048,576", kb: "1,048.576", mb: "1.049", mib: "1" },
  { bytes: "10,485,760", kb: "10,485.76", mb: "10.486", mib: "10" },
  { bytes: "104,857,600", kb: "104,857.6", mb: "104.858", mib: "100" },
];

export const ConversionTable = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-6 shadow-converter bg-card">
      <h2 className="text-2xl font-bold mb-4">Quick Reference Table</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-sm">Bytes</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Kilobytes (KB)</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Megabytes (MB)</th>
              <th className="text-left py-3 px-4 font-semibold text-sm">Mebibytes (MiB)</th>
            </tr>
          </thead>
          <tbody>
            {conversions.map((row, index) => (
              <tr
                key={index}
                className="border-b border-border hover:bg-muted/50 transition-smooth"
              >
                <td className="py-3 px-4 font-mono text-sm">{row.bytes}</td>
                <td className="py-3 px-4 font-mono text-sm">{row.kb}</td>
                <td className="py-3 px-4 font-mono text-sm text-primary font-medium">{row.mb}</td>
                <td className="py-3 px-4 font-mono text-sm text-accent font-medium">{row.mib}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
