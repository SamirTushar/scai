import { BarChart3 } from "lucide-react";

export default function ChartView() {
  return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="text-center max-w-lg">
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <BarChart3 size={36} className="text-text-secondary" />
        </div>
        <h2 className="text-xl font-semibold text-text-primary mb-3">
          Chart View
        </h2>
        <p className="text-[15px] text-text-secondary leading-relaxed">
          This view will display interactive charts and visualizations.
          Provide an HTML file to embed here.
        </p>
      </div>
    </div>
  );
}
