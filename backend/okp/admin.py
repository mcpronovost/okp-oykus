from django.contrib import admin


class okpAdminSite(admin.AdminSite):
    def get_app_list(self, request, app_label=None):
        apps = super().get_app_list(request, app_label)

        a_order = ["okpusers", "auth", "okpgames", "okpforums"]
        apps = sorted(apps, key=lambda x: a_order.index(x["app_label"]))

        temp = []
        to_remove = []
        for a in apps:
            if a["app_label"] == "okpusers":
                temp.append(a["models"][0])
                to_remove.append(a)
            if a["app_label"] == "auth":
                a["models"].append(temp[0])
            if a["app_label"] == "okpforums":
                m_order = [
                    "okpForum",
                    "okpForumCategory",
                    "okpForumSection",
                    "okpForumTopic",
                    "okpForumMessage"
                ]
                a["models"] = sorted(a["models"], key=lambda x: m_order.index(x["object_name"]))
        
        for a in to_remove:
            apps.remove(a)

        return apps
