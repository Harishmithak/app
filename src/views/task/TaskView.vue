<!-- task page  -->
<template>
    <div class="container col-12" style="padding: 0">
        <h1 style="color: black; margin-top: 20px" class="blogs text-center">Tasks</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col-2">Task</th>
                    <th scope="col-2">Start Date</th>
                    <th scope="col-2">End Date</th>
                    <th scope="col-2">Actual End Date</th>
                    <th scope="col-2">Status</th>
                    <th scope="col-2">Assigned to</th>
                    <th scope="col-1">update status</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="task in taskindex" :key="task.id">
                    <td>{{ task.title }}</td>
                    <td>{{ task.startdate }}</td>
                    <td>{{ task.duedate }}</td>
                    <td v-if="task.status === 'Completed'">{{ task.actualEndDate }}</td>
                    <td v-else></td>
                    <td>{{ task.status }}</td>
                    <td>{{ task.assigned }}</td>
                    <td v-if="isAssignedToCurrentUser(task)">
                        <button @click="showStatusUpdateModal(task)" id="update">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  

<script>
import Swal from 'sweetalert2';

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    name: 'TaskView',
    data() {
        return {
            taskindex: [],


        };
    },
    mounted() {
        this.fetchData();
        setInterval(() => {
            this.fetchData();
        }, 2000);
    },
    computed: {

        ...mapState(['user']),
        ...mapGetters(['userName']),
    },
    methods: {
        fetchData() {


            fetch(`http://localhost:3000/task`)
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.taskindex = data;
                });
        },

        isAssignedToCurrentUser(task) {
            return task.assigned === this.userName;
        },
        showStatusUpdateModal(task) {
            const statusOptions = ['Completed', 'Not Completed', 'In progress'];

            Swal.fire({
                title: 'Update Task Status',
                input: 'select',
                inputOptions: statusOptions,
                inputPlaceholder: 'Select status',
                showCancelButton: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('status updated successfully!', '', 'success');
                    const selectedStatusIndex = result.value;
                    const selectedStatus = statusOptions[selectedStatusIndex];

                    if (selectedStatus === 'Completed') {
                        const currentDate = new Date().toISOString().slice(0, 10);
                        task.actualEndDate = currentDate;
                    } else {
                        task.actualEndDate = null;
                    }

                    const updatedTask = { ...task, status: selectedStatus };

                    fetch(`http://localhost:3000/task/${task.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(updatedTask),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.status === 'success') {
                                const updatedTaskIndex = this.taskindex.map((t) =>
                                    t.id === task.id ? { ...t, status: selectedStatus, actualEndDate: task.actualEndDate } : t
                                );
                                this.taskindex = updatedTaskIndex;

                            }
                        })
                        .catch((error) => {
                            console.error('Error updating task status:', error);
                        });
                }
            });
        },

    },
};
</script>
    
<style scoped>
.cards {

    background-color: rgb(17, 16, 16);
    margin-left: -50px;
    padding-left: 23px;
    width: 565px;
    color: white;
    margin-top: 50px;
    height: 100px;
    display: inline-flex;
    box-shadow: 1px 2px 4px rgb(165, 162, 162);


}


.blogs {
    color: black;
    font-weight: 700;
    font-family: logo;
}

#update {
    background-color: black;
    color: white;
    margin-top: 40px;
}
</style>