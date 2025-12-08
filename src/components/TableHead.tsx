export default function TableHead() {
  return (
    <thead className="bg-(--color-brand-500) uppercase tracking-[0.4px] font-semibold text-(--color-grey-50)">
      <tr>
        <th className="px-[1.6rem] py-[1.8rem]">Serial No.</th>
        <th className="px-[1.6rem] py-[1.8rem]">Title</th>
        <th className="px-[1.6rem] py-[1.8rem]">Owner</th>
        <th className="px-[1.6rem] py-[1.8rem]">Last Updated</th>
        <th className="px-[1.6rem] py-[1.8rem]">Actions</th>
      </tr>
    </thead>
  );
}
