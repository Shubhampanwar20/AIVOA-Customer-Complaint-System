type Props = {
  number: string;
  title: string;
};

const SectionTitle = ({ number, title }: Props) => {
  return (
    <div className="col-span-full mt-6 mb-1">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
        {number}. {title}
      </p>
    </div>
  );
};

export default SectionTitle;