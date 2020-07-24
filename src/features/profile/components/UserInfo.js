import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import RateReviewIcon from '@material-ui/icons/RateReview';
import { useFetchUserInfo } from '../redux/fetchUserInfo';
import { useFollowUser } from '../redux/followUser';
import { useReset } from '../redux/reset';
import { UserLoading, PendButton } from '../../common';
import { milisecToDate } from '../../common/helper';
import './UserInfo.less';

export default function UserInfo(props) {
  const { id } = { ...props };
  const { user, fetchUserInfo, fetchUserInfoPending } = useFetchUserInfo();
  const { followUser, followUserPending } = useFollowUser();
  const loginUser = useSelector((state) => state.auth.user);
  const isMe = loginUser && loginUser.id === id;
  const { resetState } = useReset();

  useEffect(() => {
    fetchUserInfo(id);
  }, [fetchUserInfo, id]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  return (
    <div className="feature-profile-userinfo-container">
      {user ? (
        <Paper square style={{ padding: 15, width: '100%', color: '#87a1aa' }}>
          <div className="feature-profile-userinfo-basic">
            <Avatar
              alt={user.name}
              src={user.avatarUrl}
              style={{
                border: '1px solid #dce3e8',
                width: 45,
                height: 45,
                marginRight: 14,
              }}
            />
            <div>
              <Typography
                style={{ color: '#39434b', fontWeight: 'bold', fontSize: 20 }}
              >
                {user.name}
              </Typography>
              <Typography style={{ fontSize: 13 }}>
                {`Since ${milisecToDate(user.created)}`}
              </Typography>
            </div>
          </div>
          <Divider
            style={{
              margin: 'auto',
              marginTop: 10,
              marginBottom: 10,
            }}
          />
          <div className="feature-profile-userinfo-follow">
            <div className="feature-profile-userinfo-follow-word">
              <div className="feature-profile-userinfo-follow-text">
                {user.followerCount}
              </div>
              <div>Follower</div>
            </div>
            <Divider orientation="vertical" style={{ height: 45 }} />
            <div className="feature-profile-userinfo-follow-word">
              <div className="feature-profile-userinfo-follow-text">
                {user.followeeCount}
              </div>
              <div>Followee</div>
            </div>
          </div>
          <Divider
            style={{
              margin: 'auto',
              marginTop: 10,
              marginBottom: 15,
            }}
          />
          <div className="feature-profile-userinfo-icons">
            <div className="feature-profile-userinfo-icon-container">
              <ContactSupportIcon className="feature-profile-userinfo-icon" />
              <div>{user.questionCount}</div>
            </div>
            <div className="feature-profile-userinfo-icon-container">
              <RateReviewIcon className="feature-profile-userinfo-icon" />
              <div>{user.answerCount}</div>
            </div>
            <div className="feature-profile-userinfo-icon-container">
              <RssFeedIcon className="feature-profile-userinfo-icon" />
              <div>{user.followCount}</div>
            </div>
          </div>
          <div className="feature-profile-userinfo-desc">
            <Typography
              style={{ color: '#39434b', fontWeight: 'bold', fontSize: 14 }}
            >
              Description
            </Typography>
            <Typography>{user.description}</Typography>
          </div>
          {isMe ? null : (
            <div className="feature-profile-userinfo-follow-button">
              <PendButton
                style={{
                  margin: 'auto',
                  marginTop: 15,
                  color: 'white',
                  backgroundColor: user.following ? '#ababab' : '#ea4c89',
                }}
                color="primary"
                pending={followUserPending}
                onClick={() => followUser(id, user.following)}
              >
                {user.following ? `Unfollow` : `Follow the guy`}
              </PendButton>
            </div>
          )}
        </Paper>
      ) : (
        <UserLoading />
      )}
    </div>
  );
}
