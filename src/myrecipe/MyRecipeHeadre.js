export default function MyRecipeHeadre() {
  return (
    <div className="container-fluid page-header py-5">
      <h1 className="text-center text-white display-6">나의 레시피</h1>
      <ol className="breadcrumb justify-content-center mb-0">
        <li className="breadcrumb-item">
          <a href="#">마이페이지</a>
        </li>
        <li className="breadcrumb-item active text-white">나의 레시피</li>
      </ol>
    </div>
  );
}
