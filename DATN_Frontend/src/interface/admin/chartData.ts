export interface ChartData {
    totalUser: {
      totalUser: number;
      userLastWeekTotal: number;
      userWeekBeforeLastTotal: number;
    };
    totalNTV: {
      totalNTV: number;
      userLastWeekTotalNTV: number;
      userWeekBeforeLastTotalNTV: number;
    };
    totalNTD: {
      totalNTD: number;
      userLastWeekTotalNTD: number;
      userWeekBeforeLastTotalNTD: number;
    };
    totalPosts: {
      totalPosts: number;
      postLastWeekTotalPosts: number;
      postWeekBeforeLastTotalPosts: number;
    };
    totalCareers: number;
    TotalPackage: number;
    packageData: []
  }
  