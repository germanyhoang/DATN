export function calculatePercentageChange(tuanTruoc: number, TuanNay: number): number {
  if (tuanTruoc === 0) {
    if (TuanNay > 0) {
      return 100; // Giá trị tăng 100%
    } else if (TuanNay < 0) {
      return -100; // Giá trị giảm 100%
    } else {
      return 0; // Không có sự thay đổi
    }
  }

  const percentageChange = ((TuanNay - tuanTruoc) / tuanTruoc) * 100;
  return percentageChange;
}
