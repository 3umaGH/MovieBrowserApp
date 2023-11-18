import { MovieCard } from "./components/MovieScroller/MovieCard";
import { MovieRow } from "./components/MovieScroller/MovieRow";
import { Sidebar } from "./components/Sidebar/Sidebar";
function App() {
  return (
    <div className="bg-secondary">
      <div className="flex flex-auto">
        <Sidebar />

        <div className=" h-screen overflow-y-auto">
          <MovieRow>
            <MovieCard img="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png" />
            <MovieCard img="https://i.redd.it/z8clg6gibvu71.jpg" />
            <MovieCard img="https://www.themoviedb.org/t/p/original/pxL6E4GBOPUG6CdkO9cUQN5VMwI.jpg" />
            <MovieCard img="https://xl.movieposterdb.com/21_01/2014/816692/xl_816692_e60e1ad1.jpg" />
            <MovieCard img="https://xl.movieposterdb.com/12_01/2012/1646987/xl_1646987_ef28751a.jpg" />
            <MovieCard img="https://movieposters.ie/wp-content/uploads/2020/09/NTTD_DIGTAL_1SHEET_ICONIC_TUX_OV-1000x1482-1.jpg" />
            <MovieCard img="https://i.pinimg.com/originals/09/ec/ff/09ecff1013e575692156118b90c46f32.jpg" />
            <MovieCard img="https://www.themoviedb.org/t/p/original/iop4oO1zaPt1FBlskre6lApd7B7.jpg" />
            <MovieCard img="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png" />
            <MovieCard img="https://i.redd.it/z8clg6gibvu71.jpg" />
            <MovieCard img="https://www.themoviedb.org/t/p/original/pxL6E4GBOPUG6CdkO9cUQN5VMwI.jpg" />
            <MovieCard img="https://xl.movieposterdb.com/21_01/2014/816692/xl_816692_e60e1ad1.jpg" />
            <MovieCard img="https://xl.movieposterdb.com/12_01/2012/1646987/xl_1646987_ef28751a.jpg" />
            <MovieCard img="https://movieposters.ie/wp-content/uploads/2020/09/NTTD_DIGTAL_1SHEET_ICONIC_TUX_OV-1000x1482-1.jpg" />
            <MovieCard img="https://i.pinimg.com/originals/09/ec/ff/09ecff1013e575692156118b90c46f32.jpg" />
            <MovieCard img="https://www.themoviedb.org/t/p/original/iop4oO1zaPt1FBlskre6lApd7B7.jpg" />

          </MovieRow>
          <MovieRow>
          <MovieCard img="https://assets-global.website-files.com/6009ec8cda7f305645c9d91b/6408f6e7b5811271dc883aa8_batman-min.png" />
            <MovieCard img="https://i.redd.it/z8clg6gibvu71.jpg" />
            <MovieCard img="https://www.themoviedb.org/t/p/original/pxL6E4GBOPUG6CdkO9cUQN5VMwI.jpg" />
            <MovieCard img="https://xl.movieposterdb.com/21_01/2014/816692/xl_816692_e60e1ad1.jpg" />
            <MovieCard img="https://xl.movieposterdb.com/12_01/2012/1646987/xl_1646987_ef28751a.jpg" />
            <MovieCard img="https://movieposters.ie/wp-content/uploads/2020/09/NTTD_DIGTAL_1SHEET_ICONIC_TUX_OV-1000x1482-1.jpg" />
            <MovieCard img="https://i.pinimg.com/originals/09/ec/ff/09ecff1013e575692156118b90c46f32.jpg" />
            <MovieCard img="https://www.themoviedb.org/t/p/original/iop4oO1zaPt1FBlskre6lApd7B7.jpg" />
          </MovieRow>
        </div>
      </div>
    </div>
  );
}

export default App;
