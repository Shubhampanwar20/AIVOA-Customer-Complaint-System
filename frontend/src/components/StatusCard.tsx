type Props = {
  title: string;
  value: string;
  color: string;
};

const StatusCard = ({ title, value, color }: Props) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <h2 className={`mt-3 text-3xl font-bold ${color}`}>
        {value}
      </h2>
    </div>
  );
};

export default StatusCard;