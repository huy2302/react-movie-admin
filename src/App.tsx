import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import DanhSachPhim from './pages/DanhSachPhim';
import ThemPhim from './pages/ThemPhim';
import ChinhSuaPhim from './pages/ChinhSuaPhim';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DanhSachTheLoai from './pages/DanhSachTheLoai';
import DanhSachNguoiDung from './pages/DanhSachNguoiDung';
import DanhSachBinhLuan from './pages/DanhSachBinhLuan';
import ChinhSuaTheLoai from './pages/ChinhSuaTheLoai';
import ThemTheLoai from './pages/ThemTheLoai';
import ChinhSuaNguoiDung from './pages/ChinhSuaNguoiDung';
import ThemNguoiDung from './pages/ThemNguoiDung';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route
          index
          element={
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          }
        />
        <Route
          path="/calendar"
          element={
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          }
        />
        <Route
          path="/admin/movies"
          element={
            <>
              <PageTitle title="Quản Lý Phim | Admin" />
              <DanhSachPhim />
            </>
          }
        />
        <Route
          path="/admin/genres"
          element={
            <>
              <PageTitle title="Quản Lý Thể loại | Admin" />
              <DanhSachTheLoai />
            </>
          }
        />
        <Route
          path="/admin/users"
          element={
            <>
              <PageTitle title="Quản Lý Người dùng | Admin" />
              <DanhSachNguoiDung />
            </>
          }
        />
        <Route
          path="/admin/user/edit/:id"
          element={
            <>
              <PageTitle title="Chỉnh sửa Người dùng | Admin" />
              <ChinhSuaNguoiDung />
            </>
          }
        />
        <Route
          path="/admin/comments"
          element={
            <>
              <PageTitle title="Quản Lý Bình luận | Admin" />
              <DanhSachBinhLuan />
            </>
          }
        />
        <Route
          path="/admin/movies/add"
          element={
            <>
              <PageTitle title="Thêm phim mới | Admin" />
              <ThemPhim />
            </>
          }
        />
        <Route
          path="/admin/user/add"
          element={
            <>
              <PageTitle title="Thêm người dùng mới | Admin" />
              <ThemNguoiDung />
            </>
          }
        />
        <Route
          path="/admin/genre/add"
          element={
            <>
              <PageTitle title="Thêm thể loại | Admin" />
              <ThemTheLoai />
            </>
          }
        />
        <Route
          path="/admin/movies/edit/:id"
          element={
            <>
              <PageTitle title="Chỉnh sửa phim | Admin" />
              <ChinhSuaPhim />
            </>
          }
        />
        <Route
          path="/admin/genres/edit/:id"
          element={
            <>
              <PageTitle title="Chỉnh sửa thể loại | Admin" />
              <ChinhSuaTheLoai />
            </>
          }
        />
        <Route
          path="/movies/edit/:id"
          element={
            <>
              <PageTitle title="Chỉnh sửa phim | Admin" />
              <ChinhSuaPhim />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          }
        />
        <Route
          path="/forms/form-elements"
          element={
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          }
        />
        <Route
          path="/forms/form-layout"
          element={
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          }
        />
        <Route
          path="/tables"
          element={
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          }
        />
        <Route
          path="/settings"
          element={
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          }
        />
        <Route
          path="/chart"
          element={
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          }
        />
        <Route
          path="/ui/alerts"
          element={
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          }
        />
        <Route
          path="/ui/buttons"
          element={
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Login Admin" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
