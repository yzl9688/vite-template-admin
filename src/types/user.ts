export interface UserInfo {
  /**
   * 用户ID
   */
  userId: number | null;
  /**
   * 用户名
   */
  username?: string;
  /**
   * 邮箱
   */
  email?: string;
  /**
   * 头像
   */
  avatar?: string;
  /**
   * 身份
   */
  role?: string;
}
