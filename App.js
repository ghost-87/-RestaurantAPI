import React from "react";
import { View, ScrollView, AsyncStorage } from "react-native";
import { Thumbnail, Icon, Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Provider, connect } from "react-redux";
import ReduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import SideBar from "./src/components/SideBar/SideBar";
import Home from "./src/containers/Home/Home";
import ItemList from "./src/containers/Item/ItemList";
import MenuItemList from "./src/containers/Item/MenuItemList";
import CustomHeader from "./src/components/Header/CustomHeader";
import ItemDetail from "./src/containers/Item/ItemDetail";
import Category from "./src/containers/Category/Category";
import Cart from "./src/containers/Cart/Cart";
import Offer from "./src/containers/Offer/Offer";
import Contact from "./src/containers/Contact/Contact";
import AddressList from "./src/containers/Delivery/AddressList";
import AddressForm from "./src/containers/Delivery/AddressForm";
import Payment from "./src/containers/Delivery/Payment";
import ThankUser from "./src/containers/Delivery/ThankUser";
import Favourite from "./src/containers/Favourite/Favourite";
import LoginScreen from "./src/containers/User/LoginScreen";
import Registration from "./src/containers/User/Registration";
import ForgetPassword from "./src/containers/User/ForgetPassword";
import OtpGenerate from "./src/containers/User/OtpGenerate";
import ConfirmPassword from "./src/containers/User/ConfirmPassword";
import BookTable from "./src/containers/Table/BookTable";
import BookingHistory from "./src/containers/Table/BookingHistory"
import NewsDetail from "./src/containers/News/NewsDetail";
import News from "./src/containers/News/News";
import Order from "./src/containers/Order/Order";
import OrderRating from "./src/containers/Order/OrderRating";
import OrderStatus from "./src/containers/Order/OrderStatus";
import OrderDetail from "./src/containers/Order/OrderDetail";
import ChatScreen from "./src/containers/Chat/Chat";
import Reducers from "./src/reducers";
import Drawer from "./src/components/Drawer"
import { establishConnection } from "./src/services/Socket";
import { fetchUserById } from "./src/actions/index";
import { Color } from "./src/common/Constants";
import Setting from "./src/containers/Setting/Setting";
import CartButton from './src/components/Header/CartButton';
import MenuButton from './src/components/Header/MenuButton';
import About from "./src/components/About/About";
import ShareInfo from "./src/containers/share/ShareInfo";
import FCM, {
  FCMEvent,
  RemoteNotificationResult,
  WillPresentNotificationResult,
  NotificationType
 } from "react-native-fcm";
 import i18n from "./i18n";
 
 // this shall be called regardless of app state: running, background or not running. Won't be called when app is killed by user in iOS
 FCM.on(FCMEvent.Notification, async notif => {
  // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
  if (notif.local_notification) {
    //this is a local notification
  }
  if (notif.opened_from_tray) {
    //iOS: app is open/resumed because user clicked banner
    //Android: app is open/resumed because user clicked banner or tapped app icon
  }
  // await someAsyncCall();
 
  if (Platform.OS === "ios") {
    if (notif._actionIdentifier === "com.myapp.MyCategory.Confirm") {
      // handle notification action here
      // the text from user is in notif._userText if type of the action is NotificationActionType.TextInput
    }
    //optional
    //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1623013-application.
    //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
    //notif._notificationType is available for iOS platfrom
    switch (notif._notificationType) {
      case NotificationType.Remote:
        notif.finish(RemoteNotificationResult.NewData); //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
        break;
      case NotificationType.NotificationResponse:
        notif.finish();
        break;
      case NotificationType.WillPresent:
        notif.finish(WillPresentNotificationResult.All); //other types available: WillPresentNotificationResult.None
        break;
    }
  }
 });
 FCM.on(FCMEvent.RefreshToken, token => {
  console.log(token);
  // fcm token may not be available on first load, catch it here
 });
 
 // Styles
 
const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, Reducers);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log("root auth_key ", this.props.auth_key);
    // AsyncStorage.getItem("auth_key").then(response => {
    //   response ? this.props.autoLogin() : this.props.startup();
    // });
    this.props.auth_key ? this.props.autoLogin() : "";
  }
  componentDidMount(){
    console.disableYellowBox = true;
    // iOS: show permission prompt for the first call. later just check permission in user settings
    // Android: check permission in user settings
    FCM.requestPermissions()
      .then(() => console.log("granted"))
      .catch(() => console.log("notification permission rejected"));
 
    FCM.getFCMToken().then(token => {
      console.log(token);
      // store fcm token in your server
    });
 
    this.notificationListener = FCM.on(FCMEvent.Notification, async notif => {
      // optional, do some component related stuff
      console.log("get-------------- " + JSON.stringify(notif));
    });
 
    // initial notification contains the notification that launchs the app. If user launchs app by clicking banner, the banner notification info will be here rather than through FCM.on event
    // sometimes Android kills activity when app goes to background, and when resume it broadcasts notification before JS is run. You can use FCM.getInitialNotification() to capture those missed events.
    // initial notification will be triggered all the time even when open app by icon so send some action identifier when you send notification
    FCM.getInitialNotification().then(notif => {
      console.log("get " + JSON.stringify(notif));
    });
  }

  render() {
    const store = createStore(
      persistedReducer,
      {},
      applyMiddleware(ReduxThunk)
    );
    const persistor = persistStore(store);
    
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Root>
            <SimpleApp />
          </Root>
        </PersistGate>
      </Provider>
    );
  }
}

const SimpleApp = StackNavigator({
  Drawer: {
    screen: Drawer,
    navigationOptions: {
      header: null
    }
  },
  Home: { screen: Home },
  ItemList: { screen: ItemList },
  MenuItemList: { screen: MenuItemList },
  ItemDetail: { screen: ItemDetail },
  Cart: { screen: Cart },
  AddressList: { screen: AddressList },
  AddressForm: { screen: AddressForm },
  Payment: { screen: Payment },
  ThankUser: { screen: ThankUser },
  LoginScreen: { screen: LoginScreen },
  Registration: { screen: Registration },
  ForgetPassword: { screen: ForgetPassword },
  OtpGenerate: { screen: OtpGenerate },
  ConfirmPassword: { screen: ConfirmPassword },
  News: { screen: News },
  NewsDetail: { screen: NewsDetail },
  CustomHeader: { screen: CustomHeader },
  BookTable: { screen: BookTable },
  Favourite: { screen: Favourite },
  Order: { screen: Order },
  Chat: { screen: ChatScreen },
  OrderDetail: { screen: OrderDetail },
  OrderRating: { screen: OrderRating },
  OrderStatus: { screen: OrderStatus },
  About: { screen: About },
  Map: { screen: Map }
});