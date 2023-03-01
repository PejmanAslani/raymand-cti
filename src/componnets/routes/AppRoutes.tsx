import React from "react";
import GlobalOutbounds from "../call-routes/global-outbound/GlobalOutbounds";
import GlobalOutboundsForm from "../call-routes/global-outbound/GlobalOutboundsForm";
import SipGlobals from "../sip/sip-globals/SipGlobals";
import SipProfileDetails from "../sip/sip-profile-details/SipProfileDetails";
import SipProfileForm from "../sip/sip-profiles/SipProfileForm";
import SipProfiles from "../sip/sip-profiles/SipProfiles";
import SipTrunkForm from "../sip/sip-trunks/SipTrunkForm";
import SipTrunks from "../sip/sip-trunks/SipTrunks";
import SipUsers from "../sip/sip-users/SipUsers";
import SipUsersForm from "../sip/sip-users/SipUsersForm";
import SystemSipSettings from "../sip/system-sip-settings/SystemSipSettings";
import SipGroupUsers from "../sip/user-groups/SipGroupUsers";
import SipGroupUsersForm from "../sip/user-groups/SipGroupUsersFrom";
import SpecificOutboundsForm from "../call-routes/specific-outbound/SpecificOutboundsForm";
import SpecificOutbounds from "../call-routes/specific-outbound/SpecificOutbounds";
import ChangePassword from "../user/ChangePassword";
import AddGroupUsersForm from "../sip/add-group-users/AddGroupUsersForm";
import Inbounds from "../call-routes/inbound/Inbounds";
import InBoundsForm from "../call-routes/inbound/InboundsForm";
import BulkDeleteUsers from "../sip/sip-users/bulk-user-delete/BulkDeleteUsers";
import BulkEditUsers from "../sip/sip-users/bulk-user-edit/BulkEditUsers";
import Reports from "../reports/Reports";
import OnlineView from "../online-view/OnlineView";
import AddActions from "../call-routes/AddActions/AddActions";

export interface IAppRouteNode {
  path: string;
  element: React.ReactNode;
}

export const AppRoutes = [

  { path: "/settings/sip-globals", element: <SipGlobals /> },
  { path: "/settings/system-sip-settings", element: <SystemSipSettings /> },
  { path: "/sip-profiles/index", element: <SipProfiles /> },
  { path: "/sip-profiles/edit/:id", element: <SipProfileForm /> },
  { path: "/sip-profiles/create", element: <SipProfileForm /> },
  { path: "/sip-profile-details/:id", element: <SipProfileDetails /> },
  { path: "/sip-trunks/index", element: <SipTrunks /> },
  { path: "/sip-trunks/edit/:id", element: <SipTrunkForm /> },
  { path: "/sip-trunks/create", element: <SipTrunkForm /> },
  { path: "/sip-users/index", element: <SipUsers /> },
  { path: "/sip-users/create", element: <SipUsersForm /> },
  { path: "/sip-users/edit/:id", element: <SipUsersForm /> },
  { path: "/add-group-users/index", element: <AddGroupUsersForm /> },
  { path: "/sip-group-users/index", element: <SipGroupUsers /> },
  { path: "/sip-group-users/create", element: <SipGroupUsersForm /> },
  { path: "/sip-group-users/edit/:id", element: <SipGroupUsersForm /> },
  { path: "/call-routes/global-outbounds/index", element: <GlobalOutbounds /> },
  { path: "/call-routes/global-outbounds/create", element: <GlobalOutboundsForm /> },
  { path: "/call-routes/global-outbounds/edit/:id", element: <GlobalOutboundsForm /> },
  { path: "/call-routes/specific-outbounds/index", element: <SpecificOutbounds /> },
  { path: "/call-routes/specific-outbounds/create", element: <SpecificOutboundsForm /> },
  { path: "/call-routes/specific-outbounds/edit/id", element: <SpecificOutboundsForm /> },
  { path: "/call-routes/inbounds/index", element: <Inbounds /> },
  { path: "/call-routes/inbounds/create", element: <InBoundsForm /> },
  { path: "/call-routes/inbounds/edit/id", element: <InBoundsForm /> },
  { path: "/sip-users/index", element: <SipUsers /> },
  { path: "/sip-users/create", element: <SipUsersForm /> },
  { path: "/sip-users/:id", element: <SipUsersForm /> },
  { path: "/sip-users-bulk-delete/index", element: <BulkDeleteUsers /> },
  { path: "/sip-users-bulk-edit/index", element: <BulkEditUsers /> },
  { path: "/change-password/index", element: <ChangePassword /> },
  { path: "/call-reports/index", element: <Reports /> },
  { path: "/online-view/index", element: <OnlineView /> },
  { path: "/test", element: <AddActions /> },
];
